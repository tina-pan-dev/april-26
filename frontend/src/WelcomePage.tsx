import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDelivery, getCatImage } from './api';
interface DeliveryData {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

function WelcomePage() {
  const { userId } = useParams<{ userId: string }>();

  const [data, setData] = useState<DeliveryData | null>(null);
  const [catImage, setCatImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError('Missing user ID');
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        const [delivery, image] = await Promise.all([
          getDelivery(userId),
          getCatImage(),
        ]);

        setData(delivery);
        setCatImage(image);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  if (error) {
    return <div className="page">Error: {error}</div>;
  }

  if (!data) {
    return <div className="page">No data available</div>;
  }

  return (
    <div className="page">
      <section className="delivery-card">
        <div className="image-wrap">
          {catImage && <img src={catImage} alt="A cute cat" />}
        </div>

        <div className="content">
          {data.freeGift && <div className="gift-ribbon">FREE GIFT</div>}

          <h1>{data.title}</h1>
          <p className="message">{data.message}</p>

          <p className="price">
            <strong>Total price:</strong> £{data.totalPrice.toFixed(2)}
          </p>

          <div className="actions">
            <button className="primary">SEE DETAILS</button>
            <button className="secondary">EDIT DELIVERY</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
