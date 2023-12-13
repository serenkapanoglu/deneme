import { useAsync } from "react-async-hook";
import { useNavigate, useParams } from "react-router-dom";
import { Comments } from "~/components/Comments";
import { Container } from "~/components/Container";
import Post from "~/components/Post";
import { aon } from "~/sdk";
import { Box } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { XIcon } from "~/util/icons";
import { childVariants } from "~/util/motion";

export function PostModal() {
  let navigate = useNavigate();
  const { id } = useParams();

  const fetcher = useAsync(aon.getPost, [id || ""]);
  console.log(fetcher)

  return (
    <MotionBox
      className="fixed top-0 right-0 bottom-0 left-0 bg-[var(--color-modal)] z-100 overflow-y-auto"
      variants={childVariants({ fade: 1, duration: 0.2 })}
    >
      <style>{`body{overflow:hidden}`}</style>
      <Container size={1000} className="py-[100px] px-[20px]">
        {fetcher.result && <Post data={fetcher.result} index={`${id}`} />}
        {fetcher.result?.privacy === "public" && (
          <Comments comments={fetcher.result?.comments} />
        )}
      </Container>
      <Box
        className="fixed top-[20px] right-[20px] p-[4px] rounded-full cursor-pointer hover:bg-[var(--color-hover)] w-[40px] h-[40px] flex flex-row items-center justify-center"
        onClick={() => navigate(-1)}
      >
        <XIcon className="w-[20px] h-[20px] text-white" />
      </Box>
    </MotionBox>
  );
}
