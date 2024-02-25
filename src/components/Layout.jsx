import Header from "./Header/Header";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div style={{
                backgroundColor: '#FBFBF3', 
                height:'100vh', 
                margin: "0 auto",
                padding: "0 100px" }}>{props.children}</div>
        </>
    );
};

export default Layout;