const SignInBottom = () => {
  return (
    <div className="w-full my-4 py-5 text-xs text-center border-t-[1px] bg-zinc-100 bg-gradient-to-t from-white via-white to-zinc-100">
      <div className="w-[350px] mx-auto mb-3 flex gap-3 justify-center items-center">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940"
          className="defaultLink"
        >
          Conditions of Use
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
          className="defaultLink"
        >
          Privacy Notice
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
          className="defaultLink"
        >
          Help
        </a>
      </div>
      <div className=" text-lightGray">
        © 1996-2023, Amazon.com, Inc. or its affiliates
      </div>
    </div>
  );
};

export default SignInBottom;
