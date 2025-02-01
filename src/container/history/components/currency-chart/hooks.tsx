import React from "react";
import { CurrencyChartProps } from ".";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { date2str } from "../../../../utils/date";
import { cbrService } from "../../../../service/cbr";
import { loadOff, loadOn } from "../../../../store/reducers/loading";

export const useDynamic = (props: CurrencyChartProps) => {
    const cbr = useAppSelector(state => state.cbrReducer);
    const dispatch = useAppDispatch();

    const [data, setData] = React.useState({
        labels: [],
        data: []
    });
    
    React.useLayoutEffect(() => {
        (async() => {
            dispatch(loadOn(60000));
            let labels = [];
            let data = [];

            // let historyBuyCur = getHistory(props.currencyBuy)
            const date_req1 = date2str(new Date(Date.now() - 24 * 60 * 60 * 1000 * 365));
            const date_req2 = date2str(new Date());
            const val_buy = cbr.daily_course[props.currencyBuy].val_id;
            const val_sell = cbr.daily_course[props.currencySell].val_id;

            let historyBuyCur = null;
            let historySellCur = null;
            
            if (val_buy) {
                historyBuyCur = (await cbrService.getDynamic(date_req1, date_req2, val_buy)).response;
            }

            if (val_sell) {
                historySellCur = (await cbrService.getDynamic(date_req1, date_req2, val_sell)).response;
            }

            let dictHistoryBuy = {}
            if (!val_buy) {
                for (let record of historySellCur) {
                    labels.push(record[0]);
                    data.push(parseFloat(record[1]));
                }
            }
            else if (!val_sell) {
                for (let record of historyBuyCur) {
                    labels.push(record[0]);
                    data.push(1 / parseFloat(record[1]));
                }
            }
            else {
                for (let record of historyBuyCur) {
                    dictHistoryBuy[record[0]] = record[1];
                }

                for (let record of historySellCur) {
                    if (record[0] in dictHistoryBuy) {
                        labels.push(record[0]);
                        data.push(record[1] / dictHistoryBuy[record[0]]);
                    }
                }
            }

            dispatch(loadOff(1000));
            setData({ labels, data });
        })();
    }, [props.currencyBuy, props.currencySell]);

    return data;
}
