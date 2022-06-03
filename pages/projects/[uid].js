import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <div className="flex items-center justify-center grow">
      <h1>{uid}</h1>
    </div>
  );
};

export default Project;
