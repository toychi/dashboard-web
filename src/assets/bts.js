export const bts_line = {
  type: "Topology",
  objects: {
    bts_line: {
      type: "GeometryCollection",
      bbox: [
        100.49486159756167,
        13.658665353027674,
        100.61049707217948,
        13.805968377065287
      ],
      geometries: [
        {
          type: "LineString",
          properties: {
            Id: 0,
            BTS_ID: "01",
            name: "สายสุขุมวิท (จากสถานีหมอชิต -สถานีอ่อนนุช)",
            detail: "จากสถานีหมอชิต-สถานีอ่อนนุช (สายสีเขียวอ่อน)",
            num_sta: 23
          },
          arcs: [0]
        },
        {
          type: "LineString",
          properties: {
            Id: 0,
            BTS_ID: "02",
            name: "สายสีลม (จากสถานีสนามกีฬาแห่งชาติ - สถานีวงเวียนใหญ่)",
            detail:
              "จากสถานีสนามกีฬาแห่งชาติ - สถานีวงเวียนใหญ่ (สายสีเขียวเข้ม)",
            num_sta: 7
          },
          arcs: [1]
        }
      ]
    }
  },
  arcs: [
    [
      [5272, 9999],
      [-303, -390],
      [-321, -640],
      [-311, -688],
      [-294, -649],
      [-235, -374],
      [10, -38],
      [-22, -38],
      [-72, -21],
      [-343, -487],
      [-174, -259],
      [-34, -166],
      [-69, -297],
      [830, -123],
      [753, -93],
      [260, -44],
      [128, -39],
      [413, -232],
      [723, -390],
      [1098, -617],
      [1393, -779],
      [304, -160],
      [92, -141],
      [348, -574],
      [379, -628],
      [162, -221],
      [12, -173],
      [-8, -141],
      [-125, -209],
      [-166, -370],
      [-167, -334],
      [-117, -193],
      [-167, -303],
      [-83, -188]
    ],
    [
      [2946, 5973],
      [424, -58],
      [569, -86],
      [-80, -398],
      [-61, -246],
      [-175, -377],
      [-733, -218],
      [146, -292],
      [-1113, -262],
      [-316, 64],
      [-794, 132],
      [-813, 11]
    ]
  ],
  transform: {
    scale: [0.000011564703932175028, 0.000014731775581319494],
    translate: [100.49486159756167, 13.658665353027674]
  }
};

export const bts_station = {
  type: "Topology",
  objects: {
    bts_station: {
      type: "GeometryCollection",
      bbox: [
        100.49530317536822,
        13.660628243532996,
        100.6088763917784,
        13.804433378273197
      ],
      geometries: [
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีหมอชิต",
            location: "หน้าสถานีขนส่งหมอขิต(เก่า)",
            dcode: "1030",
            num_pass: "11686236",
            x: 668071.774,
            y: 1526642.037
          },
          coordinates: [5245, 9999]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีสะพานควาย",
            location: "โรงพยาบาลเปาโล-ที่ทำการไปรษณีย์สามเสน",
            dcode: "1014",
            num_pass: "2715450",
            x: 667383.605,
            y: 1525098.87
          },
          coordinates: [4676, 9032]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีอารีย์",
            location: "ปั้มเซล์-ซอยอารีย์",
            dcode: "1014",
            num_pass: "3704520",
            x: 667008.24,
            y: 1523972.776
          },
          coordinates: [4365, 8326]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีสนามเป้า",
            location: "ปั้มคาลเท็กซ์-สถานีโทรทัศน์สีกองทัพบกช่อง 5",
            dcode: "1014",
            num_pass: "1161531",
            x: 666695.436,
            y: 1522909.242
          },
          coordinates: [4105, 7659]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีอนุเสาวรีย์ชัย",
            location: "ถนนพหลโยธิน-ทางแยกเข้าอนุเสาวรีย์ชัยฯ",
            dcode: "1037",
            num_pass: "13573102",
            x: 666194.95,
            y: 1522095.951
          },
          coordinates: [3693, 7149]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีพญาไท",
            location: "พญาไทพลาซ่า-ธนาคารทหารไทย",
            dcode: "1037",
            num_pass: "6718568",
            x: 665840.439,
            y: 1521366.075
          },
          coordinates: [3401, 6692]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีราชเทวี",
            location: "ซอยพญานาค-แยกราชเทวีกับเพชรบุรี",
            dcode: "1037",
            num_pass: "3231219",
            x: 665590.195,
            y: 1520844.735
          },
          coordinates: [3194, 6365]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีสนามกีฬาแห่งชาติ",
            location: "หน้าสนามกีฬาแห่งชาติ",
            dcode: "1007",
            num_pass: "5858282",
            x: 665319.098,
            y: 1520198.273
          },
          coordinates: [2970, 5960]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีสยาม",
            location: "สยามสแควร์-สยามดิสคัฟเวอริเซ็นเตร์",
            dcode: "1007",
            num_pass: "18708131",
            x: 665736.17,
            y: 1520135.712
          },
          coordinates: [3309, 5919]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีราชดำริ",
            location: "ซอยมหาเล็กพลวง2-3",
            dcode: "1007",
            num_pass: "1496970",
            x: 666445.193,
            y: 1519405.836
          },
          coordinates: [3883, 5458]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีศาลาแดง",
            location: "ซอยสีลม 1-3",
            dcode: "1004",
            num_pass: "8969737",
            x: 665715.317,
            y: 1518175.473
          },
          coordinates: [3282, 4687]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีช่องนนทรีย์",
            location: "ถนนนราชธิวาสราชนครินทร์",
            dcode: "1004",
            num_pass: "5962016",
            x: 665381.659,
            y: 1517716.694
          },
          coordinates: [3008, 4400]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีสุรศักดิ์",
            location: "หน้าสมาคมหอการค้าไทย-จีน",
            dcode: "1028",
            num_pass: "3170970",
            x: 664526.661,
            y: 1517153.647
          },
          coordinates: [2309, 4050]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีสะพานตากสิน",
            location: "เชิงสะพานสมเด็จเจ้าพระยาตากสิน(สาทร)",
            dcode: "1004",
            num_pass: "4574950",
            x: 663736.229,
            y: 1517148.953
          },
          coordinates: [1666, 4050]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีชิดลม",
            location: "ซอยชิดลม-โรงเรียนมาแตร์เดอี",
            dcode: "1007",
            num_pass: "7892162",
            x: 666924.826,
            y: 1519948.03
          },
          coordinates: [4276, 5797]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีเพลินจิต",
            location: "ซอยร่วมฤดี-อาคารมหาทุนพลาซ่า",
            dcode: "1007",
            num_pass: "4915319",
            x: 667467.02,
            y: 1519843.762
          },
          coordinates: [4717, 5729]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีนานา",
            location: "ซอยสุขุมวิท7 -ซอยสุขุมวิท11",
            dcode: "1039",
            num_pass: "4859087",
            x: 668155.189,
            y: 1519614.372
          },
          coordinates: [5276, 5582]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีอโศก",
            location: "ซอยสุขุมวิท 19 - ซอยสุขุมวิท21",
            dcode: "1039",
            num_pass: "12160135",
            x: 668739.09,
            y: 1519197.3
          },
          coordinates: [5749, 5317]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีพร้อมพงษ์",
            location: "ซอยสุขุมวิท35- ซอยสุขุมวิท 39",
            dcode: "1033",
            num_pass: "6718186",
            x: 669719.209,
            y: 1518467.424
          },
          coordinates: [6543, 4855]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีทองหล่อ",
            location: "ซอยสุขุมวิท55",
            dcode: "1033",
            num_pass: "3740130",
            x: 670657.622,
            y: 1517779.255
          },
          coordinates: [7303, 4418]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีเอกมัย",
            location: "หน้าวัดธาตุทอง-ปากซอยเอกมัย",
            dcode: "1033",
            num_pass: "3704510",
            x: 671470.912,
            y: 1517216.207
          },
          coordinates: [7962, 4061]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีพระโขนง",
            location: "ถนนพระรามที่4 ซอยสุขุมวิท44/1",
            dcode: "1039",
            num_pass: "3008718",
            x: 672096.52,
            y: 1516799.135
          },
          coordinates: [8469, 3796]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีอ่อนนุช",
            location: "ซอยสุขุมวิท79 -ซอยสุขุมวิท81",
            dcode: "1033",
            num_pass: "11704783",
            x: 673118.347,
            y: 1515777.309
          },
          coordinates: [9295, 3150]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีกรุงธนบุรี",
            location: "ใกล้สะพานสมเด็จพระเจ้าตากสินและถนนเจริญกรุง",
            dcode: "1018",
            num_pass: "4352959",
            x: 662660.372,
            y: 1517385.381
          },
          coordinates: [791, 4203]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีวงเวียนใหญ่",
            location: "ใกล้วงเวียนใหญ่",
            dcode: "1018",
            num_pass: "4923782",
            x: 661688.175,
            y: 1517385.381
          },
          coordinates: [0, 4207]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีบางจาก",
            location: "ใกล้ทางลงทางด่วนสุขุมวิท 62",
            dcode: "1009",
            num_pass: "1163689",
            x: 673581.336,
            y: 1514827.574
          },
          coordinates: [9667, 2551]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีปุณวิถี",
            location: "ใกล้ซอยสุขุมวิท 101",
            dcode: "1009",
            num_pass: "988210",
            x: 673959.061,
            y: 1514057.411
          },
          coordinates: [9970, 2066]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีอุดมสุข",
            location: "ใกล้ซอยสุขุมวิท 103",
            dcode: "1047",
            num_pass: "2218907",
            x: 674002.8,
            y: 1512790.494
          },
          coordinates: [9999, 1269]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีบางนา",
            location: "ใกล้กับกรมอุตุนิยมวิทยา",
            dcode: "1047",
            num_pass: "517326",
            x: 673500.845,
            y: 1511502.336
          },
          coordinates: [9584, 462]
        },
        {
          type: "Point",
          properties: {
            Id: 0,
            name: "สถานีแบริ่ง",
            location: "อยู่ระหว่างซอยสุขุมวิท105และสุขุมวิท107",
            dcode: "1047",
            num_pass: "2697768",
            x: 673213.302,
            y: 1510765.806
          },
          coordinates: [9346, 0]
        }
      ]
    }
  },
  arcs: [],
  transform: {
    scale: [0.00001135845748676607, 0.000014381951669187082],
    translate: [100.49530317536822, 13.660628243532996]
  }
};
