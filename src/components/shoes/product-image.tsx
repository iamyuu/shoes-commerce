import { useImage, Img, ImgProps } from "@chakra-ui/image";
import { Skeleton } from "@chakra-ui/skeleton";
import { ImageNotFound } from "components/ui";

export interface ProductImageProps extends ImgProps {}

export function ProductImage(props: ProductImageProps) {
	const status = useImage({
		src: props.src,
		loading: "lazy",
	});

	if (!props.src || status === "failed") {
		return <ImageNotFound />;
	}

	if (status === "pending") {
		return <Skeleton />;
	}

	return <Img {...props} />;
}
