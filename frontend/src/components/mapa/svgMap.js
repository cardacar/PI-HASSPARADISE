import React, { Fragment } from "react";
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  map: {
    ":hover": {
      fill: "#000",
    },
  },
}));

const SvgMap = (props) => {
  const {
    data,
    setfilterLote,
    setConfirmDialog,
    confirmDialog,
    setFilterFn,
  } = props;
  const styles = useStyles();
  return (
    <Fragment>
      <div className="map">
        <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
          <g id="mapa_hassparadise">
            <title>Mapa HASSPARADISE</title>
            {data.map((item) => (
              <Link
                className={styles.isSelect}
                key={item.id}
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: `${
                      parseInt(item.id, 10) === 20 ||
                      parseInt(item.id, 10) === 21 ||
                      parseInt(item.id, 10) === 22 ||
                      parseInt(item.id, 10) === 23
                        ? `¿Estas seguro que deseas buscar por todos los lotes?`
                        : `Estas seguro que deseas buscar por el lote ${item.id}`
                    }`,
                    subTitle: "Se mostrara en la tabla de abajo",
                    onConfirm: () => {
                      setConfirmDialog({
                        ...confirmDialog,
                        isOpen: false,
                      });
                      setfilterLote(item.id);
                      setFilterFn({
                        fn: (items) => {
                          if (
                            parseInt(item.id, 10) === 20 ||
                            parseInt(item.id, 10) === 21 ||
                            parseInt(item.id, 10) === 22 ||
                            parseInt(item.id, 10) === 23
                          )
                            return items;
                          else return items.filter((x) => x.lot === item.id);
                        },
                      });
                    },
                  });
                }}
              >
                <path
                  key={item.id}
                  transform={item.transform}
                  fill={item.fill}
                  id={item.id}
                  d={item.d}
                  stroke="#000000"
                />
              </Link>
            ))}
            <text
              fill="#000000"
              strokeWidth="0"
              x="531.89977"
              y="-144.09958"
              id="svg_11"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 442.113 34.7133) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 2
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="503.95467"
              y="-89.05038"
              id="svg_13"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 414.899 75.0886) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 1
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="476.02353"
              y="-20.0012"
              id="svg_14"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 387.699 125.732) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 3
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="487.10533"
              y="61.97938"
              id="svg_16"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 398.491 185.86) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 9
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="484.18614"
              y="142.98459"
              id="svg_25"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 395.648 245.272) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 4
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="481.28192"
              y="238.98978"
              id="svg_26"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 392.82 315.686) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 5
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="386.19122"
              y="148.15694"
              id="svg_27"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 300.219 249.066) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 6
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="358.11143"
              y="68.20527"
              id="svg_28"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 273.422 190.426) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 7
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="357.0406"
              y="-2.79192"
              id="svg_29"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 271.831 138.354) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 8
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="318.91492"
              y="-128.73113"
              id="svg_30"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 238.112 45.9851) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 10
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="122.92707"
              y="-116.38574"
              id="svg_31"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 46.875 55.0397) matrix(0.97382 0 0 0.73344 -99.3329 143.806)"
              stroke="#000000"
            >
              LOTE 11
            </text>
            <text
              fill="#000000"
              strokeWidth="0"
              x="140.04767"
              y="48.7612"
              id="svg_32"
              fontSize="14"
              fontFamily="Noto Sans JP"
              textAnchor="start"
              xmlSpace="preserve"
              fontWeight="bold"
              transform="rotate(-0.0758957 81.3739 108.561) matrix(0.92723 -0.224145 0.297607 0.69835 -87.2076 115.329)"
              stroke="#000000"
            >
              LOTE 12
            </text>
          </g>
        </svg>
      </div>
    </Fragment>
  );
};

export default SvgMap;
