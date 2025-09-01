import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";




const Body = () => {
  const game = true;
  

  return (
    <div className="body">
      <Header game={game} />
      <Main game={game} />
      {!game && <Footer />}
      
    </div>
  );
};

export default Body;
