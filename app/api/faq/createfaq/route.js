import FAQ from "@/model2/FAQ";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();


    console.log("requestBody", requestBody)

    const faqnew = new FAQ({
      question: requestBody?.question,
      answer: requestBody?.answer,
    });

    console.log("faqnew", faqnew)
    await faqnew.save();

    return new Response(faqnew, { status: 200 });
  } catch (error) {
console.log(error)
    return new Response("Errorr", { status: 500 });
  }
};
