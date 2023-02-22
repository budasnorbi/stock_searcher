import { useDebounce } from "@/common/hooks/useDebounce";
import {
  FC,
  ChangeEvent,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface Props {
  isLoading: boolean;
  onChange: Dispatch<SetStateAction<string>>;
}

export const SearchInput: FC<Props> = ({ isLoading, onChange }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 200);

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [onChange, debouncedSearchValue]);

  const searchValueOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchValue(value);
    },
    []
  );

  return (
    <div className="relative ">
      <input
        type="text"
        className="block w-full bg-gray-900 outline-none text-white rounded-3xl px-4 py-3"
        value={searchValue}
        onChange={searchValueOnChange}
        placeholder="Search for Stock with it's symbol or name"
      />
      <div className="absolute top-2/4 right-0 -translate-y-2/4">
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};
