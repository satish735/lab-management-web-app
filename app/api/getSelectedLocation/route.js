import Location from "@/model2/Location";

export const PUT = async (request, { params }) => {
    try {
        const requestBody = await request.json();
        const selectedLocation = requestBody?.selectedLocation || "";

        // Use findOneAndUpdate to find the document and update it, or create a new one if it doesn't exist
        const updatedLocation = await Location.findOneAndUpdate(
            {}, // Empty filter means updating the first document found
            { selectedLocation: selectedLocation }, // Fields to update
            { new: true, upsert: true } // `upsert` creates a new document if none is found
        );

        return new Response(JSON.stringify(updatedLocation), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};


export const GET = async (request, { params }) => {
    try {

        const LocationInstance = await Location.find();
        return new Response(JSON.stringify(LocationInstance), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};
