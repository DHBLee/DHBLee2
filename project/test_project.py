import pytest
from project import Get_GWA, remove_file, know_top1


def main():
    test_gwa_calculation()
    test_remove_file()
    test_know_top1()

def test_gwa_calculation():
    student = Get_GWA("Test Student")
    student.list = ["VS", "S", "AA", "A", "LA", "P"]
    student.produce_products()
    assert student.GWA() == pytest.approx(2.75, 0.01)

def test_remove_file():
    with open('students.csv', 'w') as file:
        file.write("name,GWA\nTest Student,3.00\nOther Student,3.50\n")
    remove_file("Test Student")
    with open('students.csv', 'r') as file:
        content = file.read()
    assert "Test Student" not in content

def test_know_top1():
    with open('students.csv', 'w') as file:
        file.write("name,GWA\nTest Student,3.00\nTop Student,3.75\n")
    with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
        know_top1()
        assert "Top Student" in mock_stdout.getvalue()

if __name__ == "__main__":
    main()
