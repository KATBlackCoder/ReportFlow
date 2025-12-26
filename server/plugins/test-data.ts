import { db, schema } from "hub:db";
import { eq, and } from "drizzle-orm";

/**
 * Plugin de test pour créer des données de démonstration
 * Permet de tester le workflow de révision des rapports
 */
export default defineNitroPlugin(async () => {
  // Vérifier si on est en mode développement
  if (import.meta.dev !== true) {
    return;
  }

  console.log('🔧 Plugin de test activé - Création des données de démonstration...');

  try {
    // Créer des utilisateurs de test
    const hashedPassword = await hashPassword('test123');
    const testUsers = [
      {
        phone: '61000001',
        email: 'admin@test.com',
        passwordHash: hashedPassword,
        role: 'R1' as const,
        firstName: 'Admin',
        lastName: 'Test',
        isActive: true,
      },
      {
        phone: '61000002',
        email: 'manager@test.com',
        passwordHash: hashedPassword,
        role: 'R2' as const,
        firstName: 'Manager',
        lastName: 'Test',
        isActive: true,
      },
      {
        phone: '61000003',
        email: 'supervisor@test.com',
        passwordHash: hashedPassword,
        role: 'R3' as const,
        firstName: 'Supervisor',
        lastName: 'Test',
        isActive: true,
      },
      {
        phone: '61000004',
        email: 'employee@test.com',
        passwordHash: hashedPassword,
        role: 'R4' as const,
        firstName: 'Employee',
        lastName: 'Test',
        isActive: true,
      },
      {
        phone: '61000005',
        email: 'employee2@test.com',
        passwordHash: hashedPassword,
        role: 'R4' as const,
        firstName: 'Marie',
        lastName: 'Martin',
        isActive: true,
      },
    ];

    // Insérer les utilisateurs s'ils n'existent pas déjà
    for (const user of testUsers) {
      const existingUser = await db.query.users.findFirst({
        where: eq(schema.users.phone, user.phone),
      });

      if (!existingUser) {
        await db.insert(schema.users).values({
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`✅ Utilisateur créé: ${user.firstName} ${user.lastName} (${user.role})`);
      }
    }

    // Créer un questionnaire de test
    const existingQuestionnaire = await db.query.questionnaires.findFirst({
      where: eq(schema.questionnaires.title, 'Questionnaire de test'),
    });

    let questionnaireId: string;
    if (!existingQuestionnaire) {
      const [questionnaire] = await db.insert(schema.questionnaires).values({
        title: 'Questionnaire de test',
        description: 'Questionnaire pour tester le workflow de validation',
        targetRole: 'R4',
        version: 1,
        isActive: true,
        fields: [
          {
            id: 'name',
            type: 'text',
            label: 'Nom complet',
            placeholder: 'Votre nom complet',
            validation: { required: true },
            order: 1
          },
          {
            id: 'department',
            type: 'select',
            label: 'Département',
            validation: { required: true },
            options: [
              { value: 'IT', label: 'IT' },
              { value: 'HR', label: 'HR' },
              { value: 'Finance', label: 'Finance' },
              { value: 'Marketing', label: 'Marketing' }
            ],
            order: 2
          },
          {
            id: 'hoursWorked',
            type: 'number',
            label: 'Heures travaillées',
            validation: { required: true, min: 0, max: 40 },
            order: 3
          },
          {
            id: 'comments',
            type: 'textarea',
            label: 'Commentaires',
            placeholder: 'Commentaires optionnels...',
            validation: { required: false },
            order: 4
          }
        ],
        createdBy: '61000001', // Admin
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      questionnaireId = questionnaire.id;
      console.log('✅ Questionnaire de test créé');
    } else {
      questionnaireId = existingQuestionnaire.id;
    }

    // Créer quelques rapports de test
    const testReports = [
      {
        authorId: '61000004', // Employee
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'submitted' as const,
        data: {
          name: 'Jean Dupont',
          department: 'IT',
          hoursWorked: 35,
          comments: 'Travail effectué correctement cette semaine.'
        },
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 jours
        stateChangedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        authorId: '61000004', // Employee
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'returned' as const,
        correctionReason: 'Les heures travaillées semblent incorrectes. Veuillez vérifier.',
        flaggedBy: '61000003', // Supervisor
        data: {
          name: 'Jean Dupont',
          department: 'IT',
          hoursWorked: 50, // Valeur incorrecte
          comments: 'Semaine chargée.'
        },
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 jours
        stateChangedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Modifié hier
        modified: true,
      },
      {
        authorId: '61000004', // Employee
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'in_progress' as const,
        validatedBy: '61000003', // Supervisor
        data: {
          name: 'Jean Dupont',
          department: 'IT',
          hoursWorked: 38,
          comments: 'Rapport corrigé selon les remarques.'
        },
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 semaine
        stateChangedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 jours
      },
      // Rapports pour Marie Martin (R4 - 5 rapports)
      {
        authorId: '61000005', // Marie Martin
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'submitted' as const,
        data: {
          name: 'Marie Martin',
          department: 'HR',
          hoursWorked: 32,
          comments: 'Formation RH cette semaine.'
        },
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 jour
        stateChangedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        authorId: '61000005', // Marie Martin
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'validated' as const,
        validatedBy: '61000003', // Supervisor
        data: {
          name: 'Marie Martin',
          department: 'HR',
          hoursWorked: 35,
          comments: 'Réunion d\'équipe productive.'
        },
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 jours
        stateChangedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Validé il y a 2 jours
      },
      {
        authorId: '61000005', // Marie Martin
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'returned' as const,
        correctionReason: 'Veuillez préciser les détails de la formation.',
        flaggedBy: '61000003', // Supervisor
        data: {
          name: 'Marie Martin',
          department: 'HR',
          hoursWorked: 28,
          comments: 'Formation'
        },
        submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 jours
        stateChangedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Retourné il y a 5 jours
        modified: true,
      },
      {
        authorId: '61000005', // Marie Martin
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'in_progress' as const,
        validatedBy: '61000003', // Supervisor
        data: {
          name: 'Marie Martin',
          department: 'HR',
          hoursWorked: 36,
          comments: 'Rapport corrigé avec plus de détails sur la formation RH.'
        },
        submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 jours
        stateChangedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // En cours il y a 4 jours
      },
      {
        authorId: '61000005', // Marie Martin
        questionnaireId: questionnaireId,
        authorRole: 'R4' as const,
        state: 'submitted' as const,
        data: {
          name: 'Marie Martin',
          department: 'HR',
          hoursWorked: 34,
          comments: 'Préparation des entretiens d\'embauche.'
        },
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 jours
        stateChangedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ];

    // Insérer les rapports s'ils n'existent pas déjà
    for (const report of testReports) {
      const existingReport = await db.query.reports.findFirst({
        where: and(
          eq(schema.reports.authorId, report.authorId),
          eq(schema.reports.questionnaireId, report.questionnaireId),
          eq(schema.reports.submittedAt, report.submittedAt)
        ),
      });

      if (!existingReport) {
        await db.insert(schema.reports).values({
          ...report,
          createdAt: report.submittedAt,
          updatedAt: report.submittedAt,
        });
        console.log(`✅ Rapport créé: ${report.state} - ${JSON.stringify(report.data).slice(0, 50)}...`);
      }
    }

    console.log('🎉 Données de test créées avec succès!');
    console.log('');
    console.log('📋 Comptes de test disponibles:');
    console.log('   Admin (R1): 61000001 / test123');
    console.log('   Manager (R2): 61000002 / test123');
    console.log('   Supervisor (R3): 61000003 / test123');
    console.log('   Employee (R4): 61000004 / test123');
    console.log('   Employee 2 (R4): 61000005 / test123');
    console.log('');
    console.log('🔍 Testez le workflow sur /reports/review avec le compte Supervisor');

  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
  }
});
