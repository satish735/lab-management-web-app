import testpackage from '@/models/testPackage'

export const POST = async (request) => {
    try {

        const { test = null } = await request.json();

        const newtest = new testpackage({
            name: name,
            test: test
        });

        await newtest.save();


        return new Response(JSON.stringify(newtest), { status: 200 });


    } catch (error) {

        return new Response(JSON.stringify({ message: 'Failed to create Test Case' }), { status: 500 });
    }
};
