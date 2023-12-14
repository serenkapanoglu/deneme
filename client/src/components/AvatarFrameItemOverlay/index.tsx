import { Image, Text } from "~/ui";
import { aon } from "~/sdk";

export default function AvatarFrameItemOverlay(props: {
  avatarFrame: AvatarFrameData;
  onClick: (id: string) => void;
}) {
  const {
    avatarFrame: { id, title, description },
    onClick,
  } = props;

  const logged = aon.store((x) => x.session?.user);// Is this the dummy user or

  const imageProfURL = `http://localhost:8000/api${logged?.profimage}`;
  return (
    <div
      onClick={() => onClick(id)}
      style={{
        position: "relative",
        width: "100px", // Adjust the width as needed
        height: "100px", // Adjust the height as needed
        margin: "0 8px", // Adjust the margin as needed for spacing
      }}
    >
      <Image
        src={imageProfURL}
        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "8px",
          background: "rgba(0, 0, 0, 0.7)", // Adjust the background color and opacity
          borderRadius: "0 0 8px 8px",
        }}
      >
        <Text style={{ color: "white" }}>{title}</Text>
        <Text className="text-sm opacity-60" style={{ color: "white" }}>
          {description}
        </Text>
      </div>
    </div>
  );
}
