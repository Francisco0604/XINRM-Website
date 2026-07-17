import xml.etree.ElementTree as ET
import sys

def extract_text(xml_file):
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        
        # Word XML namespaces
        namespaces = {
            'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
        }
        
        for t in root.findall('.//w:t', namespaces):
            if t.text:
                print(t.text)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text(sys.argv[1])
