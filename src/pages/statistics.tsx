import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useAuth } from "@/utils/auth";
import { useInputMonth } from "@/utils/input";
import { ChartData, Record } from "@/types";
import { getRecords } from "@/utils/firestore";
import { categoryIcons, chartColors } from "@/utils";

/**
 * get the ranking of category
 * for pie chart data
 */
const getRankData = (
  records: Record[]
): { total: number; data: ChartData[] } => {
  let total = 0;

  // moeny map
  const m: { [key: string]: number } = {};
  records.forEach((r) => {
    total += r.money;
    if (!m[r.category]) {
      m[r.category] = r.money;
    } else {
      m[r.category] += r.money;
    }
  });

  // transform map to arr
  const money = [];
  let colorIdx = 0;
  for (const cat in m) {
    money.push({
      value: Math.abs(m[cat]),
      money: m[cat],
      key: cat,
      title: cat,
    });
  }

  money.sort((a, b) => a.money - b.money);
  return {
    total,
    data: money.map((m) => ({
      ...m,
      color: chartColors[colorIdx++ % chartColors.length],
      Icon: categoryIcons[m.title],
    })),
  };
};

export default function Statistics() {
  const { user } = useAuth();
  const { month, handleChange } = useInputMonth();
  const [data, setData] = useState<ChartData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch records
  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      getRecords(user.uid, month)
        .then((res) => {
          const d = getRankData(res);
          setData(d.data);
          setTotal(d.total);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [month, user?.uid || ""]);

  return (
    <div className="flex flex-col items-center gap-4 px-6 pt-10 pb-40">
      <input
        type="month"
        min="2000-01"
        max="2100-01"
        value={month}
        onChange={handleChange}
      />
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <div className="relative px-6">
            <PieChart
              data={data}
              lineWidth={50}
              startAngle={270}
              label={({ dataEntry }) => dataEntry.title}
              labelPosition={75}
              labelStyle={{ fontSize: "5px", fill: "white" }}
            />
            <div className="translate-center absolute top-1/2 left-1/2">
              ${total.toLocaleString("en-US")}
            </div>
          </div>
          <div className="w-full space-y-4 text-lg">
            {data.map(({ color, money, title, Icon }) => (
              <div key={title} className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <Icon style={{ color: "rgba(0,0,0,0.7)" }} />
                <div className="flex-grow">{title}</div>
                <div>${money.toLocaleString("en-US")}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
