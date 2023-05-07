import React, { FC } from "react";
// @ts-ignore
import { antDesign, TablePaginationConfig } from "@LSV/ut-react-libraries";

interface CompressTableProps {
  columns: any;
  items: any[];
  title?: any;
  change_page?: (page: number, pageSize?: number) => void;
  loading?: boolean;
  with_pagination?: boolean;
  count?: number;
  scroll?: boolean;
  description?: any;
  className?: any;
}

const { Table, Empty } = antDesign;

const getPaginator = (
  total: any,
  change_page?: (page: number, pageSize?: number) => void
): TablePaginationConfig => {
  return {
    showLessItems: true,
    position: ["bottomRight", "topRight"],
    total: total || 0,
    ...(change_page
      ? {
          onChange: change_page,
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }
      : {}),
    showTotal: (total /*, current*/) => {
      return (
        <div>
          {/* <span className="total-results">
                        <b>Total de estudiantes</b>
                        <span className="table-total ms-2">{total}</span>
                    </span> */}
          {change_page && (
            <span className="results-text ps-3">
              <b>Registros por página</b>
            </span>
          )}
        </div>
      );
    },
  };
};

const CompressTable: FC<CompressTableProps> = ({
  count,
  title,
  columns,
  items,
  change_page,
  loading,
  with_pagination,
  scroll,
  description,
  className,
}) => {
  items = Array.isArray(items) ? items : [];
  const data = items?.map((item, i) => ({ ...item, key: i }));
  const ops = {
    columns: columns,
    dataSource: data,
    ...(with_pagination
      ? { pagination: getPaginator(count ? count : data?.length, change_page) }
      : {}),
    loading: loading,
    bordered: true,
    className: "w-10120",
    locale: {
      emptyText: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
            color: "blue",
          }}
          description={<span className="text-primary">{description}</span>}
        />
      ),
    },
    ...(scroll ? { scroll: { x: "max-content" } } : {}),
  };
  return (
    <div className="ms-3 me-3 mt-3">
      {title && (
        <>
          <b>{title}</b>
          <br />
        </>
      )}
      <Table {...ops} />
    </div>
  );
};

CompressTable.defaultProps = {
  items: [],
  change_page: null,
  loading: false,
  with_pagination: true,
  scroll: true,
};

export default CompressTable;
