import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import IconMenu from "@/components/shared/icon-menu";
import { Sort, Tick } from "@/components/shared/icons";
import { ChevronDown, SortAsc, SortDesc } from "lucide-react";
import Popover from "#/ui/popover";

const sortOptions = [
  {
    display: "Date Added",
    slug: "createdAt",
  },
  {
    display: "Number of Clicks",
    slug: "clicks",
  },
  {
    display: "Last Clicked",
    slug: "lastClicked",
  },
];

export default function LinkSort() {
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter();
  const { sort } = router.query as { sort?: string };

  const selectedSort = useMemo(() => {
    return sortOptions.find((s) => s.slug === sort) || sortOptions[0];
  }, [sort]);

  return (
    <Popover
      content={
        <div className="w-full p-2 md:w-48">
          {sortOptions.map(({ display, slug }) => (
            <button
              key={slug}
              onClick={() => {
                let newQuery;
                newQuery = {
                  ...router.query,
                  sort: slug,
                };
                if (slug === "createdAt") {
                  delete newQuery.sort;
                }
                const { slug: omit, ...finalQuery } = newQuery;
                router.push({
                  pathname: `/${router.query.slug || "links"}`,
                  query: finalQuery,
                });
                setOpenPopover(false);
              }}
              className="flex w-full items-center justify-between space-x-2 rounded-md px-1 py-2 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text={display}
                icon={<SortDesc className="h-4 w-4" />}
              />
              {selectedSort.slug === slug && (
                <Tick className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        onClick={() => setOpenPopover(!openPopover)}
        className="flex w-48 items-center justify-between space-x-2 rounded-md bg-white px-3 py-2.5 shadow transition-all duration-75 hover:shadow-md active:scale-95"
      >
        <IconMenu
          text={sort ? selectedSort.display : "Sort by"}
          icon={
            sort ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <Sort className="h-4 w-4 shrink-0" />
            )
          }
        />
        <ChevronDown
          className={`h-5 w-5 text-gray-400 ${
            openPopover ? "rotate-180 transform" : ""
          } transition-all duration-75`}
        />
      </button>
    </Popover>
  );
}
