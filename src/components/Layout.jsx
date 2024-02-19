import Header from "./Header/Header";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div style={{backgroundColor: '#FBFBF3', height:'100vh'}}>{props.children}</div>
        </>
    );
};

export default Layout;