const Modal = ({ handleShowModal }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center w-100 min-h-screen" onClick={handleShowModal}>
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="bg-white p-0 md:p-6 z-10">
        <div className="">
          <iframe
            title="Video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/3h0_v1cdUIA"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;