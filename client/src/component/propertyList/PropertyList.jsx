import useFetch from '../hooks/useFetch';
import './propertyList.css';

const PropertyList = () => {
    const { data, loading, error } = useFetch("hotels/countByType");
    const images = [
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x197/321923131.jpeg?k=acb99a7c8201734e0264ee1fa70cde287f371269b9741958b0519b00be443123&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x197/321668686.jpeg?k=7f37a8b44836211b20724e0deda325a49e5a39e4374e1460d85b4f72d72c43a4&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x197/321936536.jpeg?k=afe4f57f95913e5a762b408e8ba0bbb8cbfcc5f4c31b0b899586709f55c1d5d7&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x197/72203920.jpeg?k=8901bcc9d621d9cd12a9cf564b1b08a7d786b6cc2152d189f3172befcd269af6&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/73220198.webp?k=62588a8129bafa49162b4cdfd8af8f8018c42b8628090650a1cb9e4d4041c467&o="
    ];
    return (
        <div className="pList">
            {loading ? 
                <p>Loading...</p>
            : 
                <>
                    {data && data.map((item, index) => (
                        <div className="pListItem" key={index}>
                            <img src={images[index]} className="pListImg" />
                            <div className="pListTitles">
                                <h1>{item.type}</h1>
                                <h2>{item.count} {item.type}s</h2>
                            </div>
                        </div>
                    ))}
                </>
            }
        </div>
    );
}

export default PropertyList;