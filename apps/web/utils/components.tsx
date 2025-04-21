import Image from "next/image";

export const currencyNameFormatter = (
  name: string,
  symbol: string,
  logo: string
) => {
  return (
    <span className="flex items-center gap-4">
      <Image
        src={logo}
        alt={name}
        width={20}
        height={20}
        className="w-6 h-6 rounded-full"
      />
      <span className="text-sm font-medium">
        {name} {" . "}
        <span className="text-xs text-muted-foreground">{symbol}</span>
      </span>
    </span>
  );
};
