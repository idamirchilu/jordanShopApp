


export default function ShareComponent(){

    const shareHandler = async () => {
        const data = {
            title: "title",
            text: "text",
            url: "https://jordanshopp-mhm-dmc.netlify.app/"
        }
        await navigator.share(data)
    }

    return <button className='btn btn-primary' onClick={shareHandler}>share</button>
}