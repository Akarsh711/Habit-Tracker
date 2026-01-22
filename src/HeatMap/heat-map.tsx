
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './style.css';

interface HeatMapProps {
    values: { date: string; count: number }[];
}

function HeatMap({ values }: HeatMapProps) {


    return (
        <>

            <div className='heat-map-container'>

                <CalendarHeatmap
                    startDate={new Date('2025-12-31')}
                    endDate={new Date('2026-12-01')}
                    showWeekdayLabels={true}
                    showMonthLabels={true}
                    values={values}
                    classForValue={(value: { count: number } | null) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        // Adjust these thresholds as needed
                        if (value.count >= 4) return 'color-scale-4';
                        if (value.count >= 3) return 'color-scale-3';
                        if (value.count >= 2) return 'color-scale-2';
                        return 'color-scale-1';
                    }}
                // tooltipDataAttrs={(value: any) => { return { 'title': 'Tooltip: ' + value } }}
                />
            </div>
        </>
    )
}

export default HeatMap



