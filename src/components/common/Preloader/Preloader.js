import preloader from '../../../assets/gif/preloader.gif';

let Preloader = (props) => {
  return (
    <div>
      <img src={preloader} alt='Preloading' />
    </div>
  )
}

export default Preloader;