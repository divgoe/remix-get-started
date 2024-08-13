import { MetaFunction } from "@remix-run/react"
import { a, x } from "../hooks/check"
import { useEffect } from "react"
import { MetaArgs } from "@remix-run/node"
import { removeDuplicateObjectsFromArray } from "~/utils/array"

export const loader = () => {
    console.log("Loader of _profile/app")
    return {}
}

export const meta: MetaFunction = ({matches}) => {
    const parentMatches = matches.flatMap(
        (match) => match.meta ?? []
    )

    const uniqueMetaMetches = removeDuplicateObjectsFromArray(parentMatches)    

    const metaForThisRoute = {
        title: "Profile apps page"
    }

    return [ ...uniqueMetaMetches, metaForThisRoute ];
}

export default function a2() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/scripts/chiliPiper.js'; // Path relative to the public directory
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    console.log("profile.app tx called",x)
}