import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-orange-500 py-3'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <Link to='/'>
          <span className='text-2xl text-white font-bold tracking-tight xss:text-xl'>
            Eats.com
          </span>
        </Link>
        <span className='text-white font-bold tracking-tight flex gap-4'>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
