import FAQ from "@/model2/FAQ";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();



    const faqnew = new FAQ({
      question: requestBody?.question,
      answer: requestBody?.answer,
    });

    await faqnew.save();

    return new Response(faqnew, { status: 200 });
  } catch (error) {
console.log(error)
    return new Response("Errorr", { status: 500 });
  }
};
