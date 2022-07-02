import pickle
import sys
import spacy
nlp1 = spacy.load(r"C:\Users\Hello\Desktop\spacy\output\model-best")
doc = nlp1(sys.argv[1]) # input sample text
result="";
for ent in doc.ents:
    result+=ent.label_+":"+ent.text+","
print(result);