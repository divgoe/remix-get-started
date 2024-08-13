import { Outlet, Scripts } from "@remix-run/react";
import type {ScriptsFunction} from "@remix-run/node";


export const loader = () => {
    console.log("Loader of _profile")
    return {}
}

export const scripts: ScriptsFunction = () => {

}

export const meta: MetaFunction = () => [
    {
        title: "JustCall - Compliance Center"
    }
]

export default function a() {
    console.log("profile tx")
    return (
        <div>
            This is main profilr
            <Outlet />
        </div>
    );
}