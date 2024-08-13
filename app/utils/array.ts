/**
 * Removes duplicate objects from an array.
 * 
 * This function removes duplicate objects by:
 * 1. Converting each object to a JSON string.
 * 2. Using a Set to filter out duplicate JSON strings.
 * 3. Converting the unique JSON strings back to objects.
 */
export const removeDuplicateObjectsFromArray = (items: Object[]) => {
    // Convert each object to a JSON string
    const stringifiedItems = items.map(item => JSON.stringify(item));
    
    // Create a Set from the array of JSON strings to ensure uniqueness
    const uniqueStringifiedItems = new Set(stringifiedItems);
    
    // Convert the Set back to an array and parse each JSON string back to an object
    const uniqueArray: Object[] = Array.from(uniqueStringifiedItems).map(item => JSON.parse(item));
    
    return uniqueArray;
}




// In our case it will work kyuki humne meta tags directly HTML m use kiye h, and last me <Meta /> use kiya h.

// <html>
//      <head>
//          <meta name="viewport" content="width=device-width, initial-scale=1">
//          <Meta />

// ...
// </html>

// Abhi hum title set aise rhe h 
// export const meta: MetaFunction = () => [
//     {
//         title: "Remix tutorial - Edit List"
//     }
// ]

// Ye work kr rha h, but this is not the right way. The right way to use meta is - 
// export const meta: MetaFunction = ({matches}) => {
//     const parentMatches = matches.flatMap(
//         (match) => match.meta ?? []
//     )

//     const uniqueMetaMetches = removeDuplicateObjectsFromArray(parentMatches)  
  

//     const metaForThisRoute = {
//         title: "Profile apps page"
//     }

//     return [ ...uniqueMetaMetches, metaForThisRoute ];
// }
// This will ensure ki root tak tumne jo bhi meta add kiye h wo override k baad bhi retain rahe.