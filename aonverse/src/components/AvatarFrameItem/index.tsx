import { Image, Text } from "~/ui";

export default function AvatarFrameItem(props: {
  avatarFrame: AvatarFrameData;
  onClick: (id: string) => void;
}) {
  const {
    avatarFrame: { id, image, title, description },
    onClick,
  } = props;

  return (
    <div onClick={() => onClick(id)} className="flex flex-col gap-[12px] max-w-[200px] text-center max-w-[45%]">
      <Image src={image} />
      <Text>{title}</Text>
      <Text className="text-sm opacity-60">{description}</Text>
    </div>
  );
}
