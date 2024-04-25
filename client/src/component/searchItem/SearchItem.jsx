import "./searchItem.css";

const SearchItem = () => {
    return (
        <div className="searchItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/192222259.webp?k=2a125b3bd046ee4f0ead287dc5c0751a023d03dab74f17f1c066149690e37254&o=" alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">Tower Street Apartments</h1>
                <span className="siDistance">500m from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                <span className="siFeatures">Entire studio + 1 bathroom + 21 m2 1 full bed</span>
                <span className="siCancelOp">Free cancellation</span>
                <div className="siCancelOpSubtitle">You can cancel later, so lock in this great price today</div>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className="siDetailsTexts">
                    <span className="siPrice">€123</span>
                    <div className="siTaxOp">Incldudes taxes and fees</div>
                    <button className="siCheckButton">See avability</button>
                </div>
            </div>

        </div>
    )
}

export default SearchItem