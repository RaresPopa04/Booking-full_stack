import useFetch from '../hooks/useFetch';
import './featured.css'

const Featured = ()=>{

    const {data,loading,error} = useFetch("hotels/countByCity?cities=madrid,berlin,london")

    return (
    <div className="featured">
        { loading ? "Loading please wait" : 
            <>
                <div className="featuredItem">
                <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/976539.jpg?k=0a7263960952588dc71a60f1f9c2e738b5c0af9b2d9d3c3df79677d630b8a665&o=" alt="" />
                <div className="featuredTitles">
                    <h1>Madrid</h1>
                    <h2>{data[0]} properites</h2>
                </div>
                </div>
                <div className="featuredItem">
                    <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/976525.jpg?k=28ab37ad52e0b672e0d84806232679ce7ec6d2fcd6ac633e4365b3097d880c51&o=" alt="" />
                    <div className="featuredTitles">
                        <h1>Berlin</h1>
                        <h2>{data[1]} properites</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/977262.jpg?k=2b852648c76ccaff8be05333057712eda873343dfaa79cd23e55534a1a55aecc&o=" alt="" />
                    <div className="featuredTitles">
                        <h1>London</h1>
                        <h2>{data[2]} properites</h2>
                    </div>
                </div>
            </>
        }
        
    </div>
    )
}

export default Featured;