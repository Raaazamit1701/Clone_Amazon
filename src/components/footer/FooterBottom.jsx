import footerCategoryData from "../../constants/footerCategoryData";

const FooterBottom = () => {
  return (
    <section name="footer-bottom" className="bg-footerBottom py-8">
      <div className="max-w-5xl mx-auto">
        <div className="px-8 grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-8 place-content-center text-gray-400">
          {footerCategoryData.map((category) => {
            return (
              <div
                className="group cursor-pointer w-max h-max"
                key={category.id}
                onClick={() => window.open(category.link, "_blank")}
              >
                <h3 className="w-24 font-semibold text-[12px] group-hover:underline text-[#DDD] leading-3 mb-[2px]">
                  {category.title}
                </h3>
                <p className="w-24 tracking-tight text-[12px] text-[#999] group-hover:underline leading-3 ">
                  {category.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex justify-center gap-4 mt-10 mb-[2px] text-[#DDD] text-[12px] font-semibold">
          <h3>Condition of Use & Sale</h3>
          <h3>Privacy Notice</h3>
          <h3>Interest-Based Ads</h3>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-[12px] text-[#DDD] mb-[2px]">
            © 1996-2023, Amazon.com, Inc. or its affiliates
          </h3>
        </div>
      </div>
    </section>
  );
};

export default FooterBottom;
