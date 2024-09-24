import React, { useState } from 'react';
import './LembarUjian.css';

interface Soal {
  pertanyaan: string;
  pilihan: string[];
  jawabanBenar: number;
}

interface Ujian {
  nama: string;
  deskripsi: string;
  soal: Soal[];
}

const daftarUjian: Ujian[] = [
  {
    nama: "Bahasa Inggris SMA",
    deskripsi: "Ujian Bahasa Inggris untuk tingkat SMA",
    soal: [
      {
        pertanyaan: "What is the correct translation of 'Selamat pagi'?",
        pilihan: ["Good night", "Good morning", "Good afternoon", "Good evening"],
        jawabanBenar: 1
      },
      // Tambahkan soal lainnya di sini
    ]
  },
  {
    nama: "Matematika SMA",
    deskripsi: "Ujian Matematika untuk tingkat SMA",
    soal: [
      {
        pertanyaan: "Berapakah hasil dari 3x + 5 = 20?",
        pilihan: ["x = 3", "x = 5", "x = 7", "x = 15"],
        jawabanBenar: 1
      },
      // Tambahkan soal lainnya di sini
    ]
  }
];

const LembarUjian: React.FC = () => {
  console.log("LembarUjian component rendered");
  const [ujianTerpilih, setUjianTerpilih] = useState<Ujian | null>(null);
  const [jawaban, setJawaban] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);

  const handlePilihUjian = (ujian: Ujian) => {
    setUjianTerpilih(ujian);
    setJawaban(new Array(ujian.soal.length).fill(-1));
    setSelesai(false);
  };

  const handleJawaban = (indexSoal: number, indexJawaban: number) => {
    const jawabanBaru = [...jawaban];
    jawabanBaru[indexSoal] = indexJawaban;
    setJawaban(jawabanBaru);
  };

  const hitungNilai = () => {
    if (!ujianTerpilih) return 0;
    let nilai = 0;
    ujianTerpilih.soal.forEach((soal, index) => {
      if (jawaban[index] === soal.jawabanBenar) nilai++;
    });
    return (nilai / ujianTerpilih.soal.length) * 100;
  };

  const handleSelesai = () => {
    setSelesai(true);
  };

  if (!ujianTerpilih) {
    console.log("Rendering daftar ujian");
    return (
      <div className="lembar-ujian">
        <h1>Pilih Ujian</h1>
        <div className="daftar-ujian">
          {daftarUjian.map((ujian, index) => (
            <div key={index} className="card ujian-card" onClick={() => handlePilihUjian(ujian)}>
              <h2>{ujian.nama}</h2>
              <p>{ujian.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  console.log("Rendering ujian terpilih:", ujianTerpilih.nama);
  return (
    <div className="lembar-ujian">
      <h1>{ujianTerpilih.nama}</h1>
      {ujianTerpilih.soal.map((soal, indexSoal) => (
        <div key={indexSoal} className="soal">
          <p>{soal.pertanyaan}</p>
          {soal.pilihan.map((pilihan, indexPilihan) => (
            <button
              key={indexPilihan}
              onClick={() => handleJawaban(indexSoal, indexPilihan)}
              className={jawaban[indexSoal] === indexPilihan ? 'pilihan-aktif' : ''}
            >
              {pilihan}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleSelesai} className="tombol-selesai">Selesai</button>
      {selesai && (
        <div className="hasil">
          <h2>Nilai Anda: {hitungNilai().toFixed(2)}%</h2>
        </div>
      )}
    </div>
  );
};

export default LembarUjian;