import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { DashboardHttpService } from '../dashboard-http.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'vks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  map: Map<string, number[]> = new Map();
  Array_hinhsu: number[] = [];
  Array_dansu: number[] = [];
  Array_tong_hinhsu: number[] = [];
  Array_tong_dansu: number[] = [];
  Array_vuan: number[] = [];
  hinhsu: number = 0;
  dansu: number = 0;
  total: number = 0;

  constructor(private http: DashboardHttpService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.getData(2024).subscribe((data) => {
      this.map = new Map<string, number[]>(Object.entries(data.content));

      const arrayNumbers = this.map.get('tong so luong vu an hinh su') || [];
      const arrayNumbers2 = this.map.get('tong so luong vu an dan su') || [];
      const arrayNumber3 = this.map.get('hinh_su');
      const arrayNumber4 = this.map.get('dan_su');
      const arrayNumber5 = this.map.get('ds so luong case tung vu an');

      if (arrayNumber5?.length) {
        for (let i = 0; i < arrayNumber5.length; i++) {
          this.Array_vuan.push(arrayNumber5[i]);
        }
      }

      if (arrayNumber3?.length) {
        for (let i = 0; i < arrayNumber3.length; i++) {
          for (let y = 0; y < Object.values(arrayNumber3[i]).length; y++) {
            this.Array_tong_hinhsu.push(Object.values(arrayNumber3[i])[y]);
          }
        }
      }
      if (arrayNumber4?.length) {
        for (let i = 0; i < arrayNumber4.length; i++) {
          for (let y = 0; y < Object.values(arrayNumber4[i]).length; y++) {
            this.Array_tong_dansu.push(Object.values(arrayNumber4[i])[y]);
          }
        }
      }

      // Gán dữ liệu nếu có
      this.Array_hinhsu = arrayNumbers;
      this.Array_dansu = arrayNumbers2;

      if (this.Array_hinhsu.length > 0) {
        this.hinhsu = this.Array_hinhsu[0];
      }
      if (this.Array_dansu.length > 0) {
        this.dansu = this.Array_dansu[0];
      }

      this.updateChart();
    });
  }

  updateChart() {
    this.total = this.dansu + this.hinhsu;
    this.doughnutChartData = {
      ...this.doughnutChartData,
      labels: ['Vụ án Hình sự:' + this.hinhsu, 'Vụ án Dân sự:' + this.dansu],
      datasets: [
        {
          ...this.doughnutChartData.datasets[0],
          data: [this.hinhsu, this.dansu], // Cập nhật dữ liệu mới
        },
      ],
    };
    // Gán lại dữ liệu cho doughnutDepartment
    let labels = [
      'Khiếu nại tố cáo',
      'Trật tự xã hội',
      'An ninh ma túy',
      'Kinh tế tham nhũng',
      'Dân sự hành chính/ KD-TM',
      'Thanh tra Khiếu tố',
      'Thi hành án',
      'Tổ chức cán bộ',
    ];
    let data = [
      this.Array_vuan[0],
      this.Array_vuan[1],
      this.Array_vuan[2],
      this.Array_vuan[3],
      this.Array_vuan[4],
      this.Array_vuan[5],
      this.Array_vuan[6],
      this.Array_vuan[7],
    ];

    // Sắp xếp data và labels theo giá trị data giảm dần
    let sortedData = data
      .map((value, index) => ({ value, label: labels[index] })) // Tạo mảng đối tượng {value, label}
      .sort((a, b) => b.value - a.value); // Sắp xếp giảm dần

    // Gán lại labels và data đã sắp xếp
    labels = sortedData.map(
      (item, index) => `${index + 1}. ${item.label} (${item.value})`
    );
    data = sortedData.map((item) => item.value);

    // Cập nhật biểu đồ với dữ liệu đã sắp xếp
    this.doughnutDepartment = {
      ...this.doughnutDepartment,
      labels: labels,
      datasets: [
        {
          ...this.doughnutDepartment.datasets[0],
          data: data, // Cập nhật dữ liệu mới
        },
      ],
    };

    this.barChartData = {
      ...this.barChartData,
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: [
            this.Array_tong_hinhsu[17],
            this.Array_tong_hinhsu[14],
            this.Array_tong_hinhsu[11],
            0,
            this.Array_tong_hinhsu[8],
            0,
            0,
            0,
            0,
            0,
            0,
            this.Array_tong_hinhsu[5],
          ], // Cập nhật dữ liệu mới
        },
        {
          ...this.barChartData.datasets[1],
          data: [
            this.Array_tong_dansu[17],
            this.Array_tong_dansu[14],
            this.Array_tong_dansu[11],
            this.Array_tong_dansu[8],
            this.Array_tong_dansu[5],
            0,
            0,
            0,
            0,
            this.Array_tong_dansu[2],
            0,
            0,
          ], // Cập nhật dữ liệu mới
        },
      ],
    };
  }

  // Biểu đồ cột (Bar Chart)
  barChartData: ChartData<'bar'> = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    datasets: [
      {
        label: 'Số vụ án hình sự',
        data: [],
        backgroundColor: ['#FF6384'],
      },
      {
        label: 'Số vụ án dân sự',
        data: [],
        backgroundColor: ['#36A2EB'],
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Giúp biểu đồ mở rộng toàn bộ container
    scales: {
      x: {
        ticks: { font: { size: 14 } }, // Tăng kích thước chữ trục X
      },
      y: {
        ticks: { font: { size: 14 } }, // Tăng kích thước chữ trục Y
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // Tăng cỡ chữ của legend
          },
        },
      },
    },
  };

  // Biểu đồ tròn (Doughnut Chart)
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Vụ án Hình sự:', 'Vụ án Dân sự:'],
    datasets: [
      {
        data: [this.hinhsu, this.dansu], // Dữ liệu mặc định
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // Biểu đồ tròn (Doughnut Chart)
  doughnutDepartment: ChartData<'doughnut'> = {
    labels: [
      'Khiếu nại tố cáo',
      'Trật tự xã hội',
      'An ninh ma túy',
      'Kinh tế tham nhũng',
      'Dân sự hành chính/ KD-TM',
      'Thanh tra Khiếu tố',
      'Thi hành án',
      'Tổ chức cán bộ',
    ],
    datasets: [
      {
        data: [], // Dữ liệu mặc định
        backgroundColor: [
          '#FF6384', // Đỏ
          '#36A2EB', // Xanh dương
          '#FFCE56', // Vàng
          '#4BC0C0', // Xanh ngọc
          '#9966FF', // Tím
          '#FF9F40', // Cam
          '#C9CBCF', // Xám
          '#6A89CC', // Xanh biển nhạt
          '#B8E994', // Xanh lá nhạt
          '#E55039', // Đỏ đậm
        ],
      },
    ],
  };

  // Cấu hình tùy chọn (options) cho biểu đồ
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 13, // Tăng cỡ chữ của legend
          },
        },
        position: 'right', // Đặt legend ở bên phải
      },
    },
  };
}
