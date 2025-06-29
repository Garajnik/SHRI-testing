import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect, afterEach } from "vitest"
import "@testing-library/jest-dom/vitest"
import { Dropzone } from "./Dropzone"


describe("Dropzone", () => {

  afterEach(() => {
    cleanup()
  })

  it("Показывает корректный текст при первом запуске", () => {
    render(<Dropzone file={null} status="idle" error={null} onFileSelect={() => { }} onClear={() => { }} />)

    expect(screen.getByText("Загрузить файл")).toBeInTheDocument();
  })

  it("Показывает ошибку, если был загружен файл неправильного формата", () => {
    const file = new File(['image'], 'image.png', { type: 'image/png' })
    render(<Dropzone file={file} status="idle" error={null} onFileSelect={() => { }} onClear={() => { }} />)

    const input = screen.getByTestId("dropinput");
    fireEvent.change(input, { target: { files: [file] } })

    expect(screen.getByText("Можно загружать только *.csv файлы")).toBeInTheDocument();
  })

  it("Показывает имя текст о загрузке, при корректной загрузке файла", () => {
    const file = new File(['report'], 'report.csv', { type: 'text/csv' })
    render(<Dropzone file={file} status="idle" error={null} onFileSelect={() => { }} onClear={() => { }} />)

    const input = screen.getByTestId("dropinput");
    fireEvent.change(input, { target: { files: [file] } })

    expect(screen.getByText("файл загружен!")).toBeInTheDocument();
  })
})
