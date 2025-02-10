import cropImage from "../Aseats/cropsIcon.png";
import fieldImage from "../Aseats/field.png";
import staffImage from "../Aseats/staffe.png";
import vehicle from "../Aseats/vehicelLogo.png";
import equipment from "../Aseats/equipementIcon.png";
// import video from "../Aseats/video/greenShadowVideo.mp4";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from "chart.js";

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function Dashboard() {

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Allows custom width/height
        responsive: true,
    };

    return (
        <>
            <div className="relative flex justify-between gap-4 left-60 top-20 w-3/4">
                <div className="w-52 h-40 bg-black text-white rounded-b-2xl flex flex-col items-center justify-center">
                    <h1 className="font-bold">CROPS</h1>
                    <img src={cropImage} alt="Crop Icon" className="w-14 h-14 filter invert brightness-200"/>
                    <h2>10</h2>
                </div>

                <div className="w-52 h-40 bg-black text-white rounded-b-2xl flex flex-col items-center justify-center">
                    <h1 className="font-bold">FIELDS</h1>
                    <img src={fieldImage} alt="Field Icon" className="w-14 h-14 filter invert brightness-200"/>
                    <h2>10</h2>
                </div>

                <div className="w-52 h-40 bg-black text-white rounded-b-2xl flex flex-col items-center justify-center">
                    <h1 className="font-bold">STAFF</h1>
                    <img src={staffImage} alt="Staff Icon" className="w-14 h-14 filter invert brightness-200"/>
                    <h2>10</h2>
                </div>

                <div className="w-52 h-40 bg-black text-white rounded-b-2xl flex flex-col items-center justify-center">
                    <h1 className="font-bold">VEHICLE</h1>
                    <img src={vehicle} alt="Vehicle Icon" className="w-14 h-14 filter invert brightness-200"/>
                    <h2>10</h2>
                </div>

                <div className="w-52 h-40 bg-black text-white rounded-b-2xl flex flex-col items-center justify-center">
                    <h1 className="font-bold">EQUIPMENT</h1>
                    <img src={equipment} alt="Equipment Icon" className="w-14 h-14 filter invert brightness-200"/>
                    <h2>10</h2>
                </div>
            </div>

            {/*<div className="w-100 h-60 relative top-32">*/}
            {/*    <video*/}
            {/*        src={video}*/}
            {/*        autoPlay*/}
            {/*        muted*/}
            {/*        loop*/}
            {/*        className="w-full h-full"*/}
            {/*    >*/}
            {/*        Your browser does not support the video tag.*/}
            {/*    </video>*/}
            {/*</div>*/}

            <div className="w-2/3 h-36 mx-auto mt-10 relative top-20 left-60">
                <div className="w-full h-96"> {/* Control size */}
                    <Line data={data} options={options}/>
                </div>
            </div>
        </>
    );
}
