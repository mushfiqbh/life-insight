import Head from "next/head";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>About Us</title>
        <meta
          name="description"
          content="Learn more about our team and mission."
        />
      </Head>
      <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-4">
          We are a dedicated team committed to providing the best service
          possible. Our mission is to deliver high-quality products and
          exceptional customer support.
        </p>
        <p className="text-gray-700">
          Thank you for visiting our site. We look forward to serving you!
        </p>
      </div>
    </div>
  );
}

export default About;
