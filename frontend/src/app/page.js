import Link from 'next/link'

export default function Home() {
    return (
        <div className="bg-[url(/mygai.png)] bg-no-repeat bg-cover container parent">
            <div className="container">
                <Link className="img img1" href="/feed"><img src="/yellow.png"/></Link>
                <Link className="img img2" href="/vet"><img src="/red.png" /></Link>
            </div>
            <Link className="img img5" href="/register"><img src="/blue.png" /></Link>
            <div className="container bottom">
                <Link className="img img3" href="/breed"><img src="/brown.png" /></Link>
                <Link className="img img4" href="/milk"><img src="/milking.png" /></Link>
            </div>
        </div>
    );
}
