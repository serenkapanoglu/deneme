import React from 'react';
import { Box, Image, ProgressBar, Text } from '~/ui'; // Replace with the actual path to your UI components

interface TrophyItemProps {
  trophy: TrophyData;
  openModal: (id: string) => void;
}


const TrophyItem: React.FC<TrophyItemProps> = ({ trophy, openModal }) => {
  const { id, image, title, description, progress, progressText } = trophy;

  const handleClick = () => {
    openModal(id);
  };

  return (
    <Box
      className="flex flex-row gap-16px cursor-pointer"
      onClick={handleClick}
    >
      <Box className="w-[60px]">
        <Image src={image} />
      </Box>
      <Box className="flex-1 flex flex-col gap-[8px]">
        <Text className="">{title}</Text>
        <Text className="text-sm opacity-60">{description}</Text>
        <ProgressBar progress={progress} />
        <Text className="text-sm">{progressText}</Text>
      </Box>
    </Box>
  );
};

export default TrophyItem;
