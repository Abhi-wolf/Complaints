import { useParams } from "react-router-dom";
import { useGetComplaint } from "./useGetComplain";
import { Badge } from "@/components/ui/badge";
import ComplaintCard from "@/components/ComplaintCard";
import DescriptionCard from "@/components/DescriptionCard";

function Complain() {
  const { complaint, isPending, error } = useGetComplaint();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!complaint) return <div>No Complaint</div>;

  return (
    <div className=" m-4 md:m-6 min-h-[86vh] ">
      <div className=" flex flex-col-reverse md:flex-row justify-evenly  md:items-center gap-6 md:gap-4 w-full h-full">
        <ComplaintCard complain={complaint} />
        <div className=" flex justify-center items-center">
          <div className="w-[250px] h-[300px] md:w-[400px] md:h-[400px] overflow-hidden">
            <figure className="w-full h-full">
              <img
                src={complaint?.idProofPdf}
                alt=""
                className="object-contain w-full h-full"
              />
            </figure>
          </div>
        </div>
      </div>
      <DescriptionCard description={complaint?.description} />
    </div>
  );
}

export default Complain;
