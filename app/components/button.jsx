const Button = (props) => {
  const { text , href } = props;

  return (
    <div>
      <button className="text-[18px] text-white  rounded-2xl  bg-linear-to-br from-[#FF7F11] to-[#F2B50B] py-3   px-10 cursor-pointer  tracking-normal font-bold hover:scale-105 transition">
       <a href={href}> {text}</a>
      </button>
    </div>
  );
};

export default Button;
