import './Loader.scss';


const Loader = ({ isLoading, children }) => {

    if (isLoading) return (<div className="loader"></div>)

    return children;
};

export default Loader;