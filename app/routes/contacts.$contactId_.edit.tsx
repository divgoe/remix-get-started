import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node"
import { Form, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant"
import { getContact, updateContact } from "~/data";

export const loader = async ({params}:LoaderFunctionArgs) => {
    console.log("edit loader")
    invariant(params.contactId, "Missing Contact Id");
    const contact = await getContact(params.contactId);

    if(!contact){
        throw new Response("Not Found", {status: 404})
    }

    return json({contact});
}

export const action = async ({params, request} : ActionFunctionArgs) => {
    console.log("Actiib edut", params, request)
    invariant(params.contactId, "Missing Contactid param");
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return {status: "si"};
}

export default function EditContact(){
    const {contact} = useLoaderData<typeof loader>()
    const navigate = useNavigate()

    console.log("Inside edit contact")

    return (
        <Form key={contact.id} method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input 
                    defaultValue={contact.first}
                    aria-label="First name"
                    name="first"
                    type="text"
                    placeholder="First"
                />
                <input 
                    defaultValue={contact.last}
                    aria-label="Last name"
                    name="last"
                    type="text"
                    placeholder="Last"
                />
            </p>

            <label>
                <span>Twitter</span>
                <input
                    defaultValue={contact.twitter}
                    name="twitter"
                    placeholder="@jack"
                    type="text"
                />
            </label>
            
            <label>
                <span>Avatar URL</span>
                <input
                    defaultValue={contact.avatar}
                    aria-label="Avatar URL"
                    name="avatar"
                    placeholder={"https://example.com/avatar.jpg"}
                    type="text"
                />
            </label>

            <label>
                <span>Notes</span>
                <textarea
                    defaultValue={contact.notes}
                    name="notes"
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={()=> navigate(-1)}>Cancel</button>
            </p>
        </Form>
    )
}