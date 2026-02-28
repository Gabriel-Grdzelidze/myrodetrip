export const SuccessMessage = (props) => {
  const { message } = props;
  return (
    <div style={{ background: 'linear-gradient(to right, #48A111, #BBCB2E)' }}
      className="text-white  py-10 mt-5 rounded flex justify-between px-20 gap-2 ">
        <h1 className="text-2xl font-bold">Success</h1>
        <p className="text-lg">{message}</p>
    </div>
  );
};

export const ErrorMessage = (props) => {
  const { message } = props;
  return (
    <div style={{ background: 'linear-gradient(to right, #C3110C, #FF0000)' }}
      className="text-white py-10 mt-5 rounded flex justify-between px-20  gap-2 ">
        <h1 className="text-2xl font-bold">Failed</h1>
        <p className="text-lg">{message}</p>
    </div>
  );
};