import loader from "../assets/loader.gif";

const Loading = () => {
    return (
        <div
            style={{
                zIndex: "400",
                position: "fixed",
                backgroundColor: "#F3F2E2",
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <img src={loader.src} style={{ width: "30vw", height: "auto", objectFit: "contain" }} />
        </div>
    );
};

export default Loading;
