import {
  Form,
  NavLink,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
  MetaFunction
} from "@remix-run/react";
import { json } from "@remix-run/node";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./app.css?url";

// existing imports
import { createEmptyContact, getContacts } from "./data";
import { useEffect } from "react";

export const loader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  // console.log("Root", params)
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  console.log(q)
  const contacts = await getContacts(q);
  console.log(contacts.length)
  return json({ contacts,q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`contacts/${contact.id}/edit`)
};

export const meta: MetaFunction = () => {
  return [
    {
      tagName: "link",
      rel: "canonical",
      href: "https://remix.run",
    }
  ];
};


export const links: LinksFunction = () => {
  return [{rel: "stylesheet", href: appStylesHref}]
}

export default function App() {
  console.log("app component mounted")
  const { contacts, q } = useLoaderData<typeof loader>();
  console.log("Loader" , contacts.length, q);
  const navigation = useNavigation();
  const submit = useSubmit();
  console.log("global this" ,typeof globalThis.addEventListener)
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  useEffect(()=>{
    console.log("Use Effect cakked")
    const searchField = document.getElementById("q");
    if(searchField instanceof HTMLInputElement){
      searchField.value = q || ""
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search" onChange={(event) => {
              const isFirstSearch = q===null
              submit(event.currentTarget, {replace: !isFirstSearch})
            }}>
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                className={searching ? "loding" : ""}
                defaultValue={q || ""}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
                <ul>
                  {contacts.map((contact) => (
                    <li key={contact.id}>
                      <NavLink 
                        to={`contacts/${contact.id}`} 
                        className={({isActive, isPending}) => 
                          isActive 
                            ? "active" 
                            : isPending 
                            ? "pending" 
                            : ""}
                      >
                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {contact.favorite ? (
                          <span>★</span>
                        ) : null}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
          </nav>
        </div>
        <div 
          id="detail" 
          className={
            navigation.state === "loading" && !searching ? "loading" : ""
          }>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
