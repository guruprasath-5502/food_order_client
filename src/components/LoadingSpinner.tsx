const LoadingSpinner = () => {
  return (
    <div className='scale-20 flex flex-col items-center justify-center'>
      <div
        className='w-40 h-40 rounded-full shadow-eclipse animate-spin'
        style={{ transformOrigin: '80px 83px' }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
