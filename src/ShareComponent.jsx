


export default function ShareComponent(){

    const shareHandler = async () => {
        const data = {
            title: "title",
            text: "text",
            url: "https://jordanshopp-mhm-dmc.netlify.app/"
        }
        if (navigator.canShare(data))
            await navigator.share(data)
    }

    return <button onClick={shareHandler}>share</button>
}