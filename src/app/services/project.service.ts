import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<Project>;
  projectDoc: AngularFirestoreDocument<Project>;
  projects: Observable<Project[]>;
  project: Observable<Project>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects', ref => ref.orderBy('name', 'asc'));
  }

  getProjects(): Observable<Project[]> {
    this.projects = this.projectsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(
          action => {
            const data = action.payload.doc.data() as Project;
            data.id = action.payload.doc.id;
            return data;
          });
      }));

      return this.projects;
  }

  newProject(project: Project) {
    this.projectsCollection.add(project);
  }

  getProject(id: string): Observable<Project> {
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.project = this.projectDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Project;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.project;
  }

  updateProject(project: Project) {
    this.projectDoc = this.afs.doc(`projects/${project.id}`);
    this.projectDoc.update(project);
  }

  deleteProject(project: Project) {
    this.projectDoc = this.afs.doc(`projects/${project.id}`);
    this.projectDoc.delete();
  }

}


/*
1. clientsCollection.snapshotChanges() - return collection with id
2. action.payload.doc.data() - return data inside a document
3. clientsCollection.add(client) - add data
4. this.afs.doc<Client>(`clients/${id}`) - get ONE item
5.
*/
